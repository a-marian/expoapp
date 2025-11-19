import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ScanScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [lastResult, setLastResult] = useState<{ type: string; data: string } | null>(null);

	const handleBarCodeScanned = useCallback(({ type, data }: { type: string; data: string }) => {
		setScanned(true);
		setLastResult({ type, data });
	}, []);

	if (!permission) {
		return (
			<View style={styles.center}>
				<Text>Requesting camera permission…</Text>
			</View>
		);
	}

	if (!permission.granted) {
		return (
			<View style={styles.center}>
				<Text>Camera permission is not granted.</Text>
				<View style={styles.spacer} />
				<Button title="Grant Permission" onPress={requestPermission} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.scannerContainer}>
				<CameraView
					style={StyleSheet.absoluteFillObject}
					onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
					barcodeScannerSettings={{
						barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', 'code93', 'pdf417', 'aztec', 'itf14'],
					}}
				/>
			</View>

			<View style={styles.bottomPanel}>
				<Text style={styles.subtitle}>Scan a barcode</Text>
				{lastResult && (
					<View style={styles.result}>
						<Text style={styles.resultLabel}>Type</Text>
						<Text style={styles.resultValue}>{lastResult.type}</Text>
						<Text style={[styles.resultLabel, { marginTop: 8 }]}>Data</Text>
						<Text style={styles.resultValue} numberOfLines={2}>{lastResult.data}</Text>
					</View>
				)}
				{scanned && (
					<Button title="Scan Again" onPress={() => setScanned(false)} />
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scannerContainer: {
		flex: 1,
		overflow: 'hidden',
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
	},
	bottomPanel: {
		padding: 16,
		gap: 12,
	},
	result: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		padding: 12,
		borderRadius: 8,
	},
	resultLabel: {
		fontWeight: '600',
		color: '#666',
	},
	resultValue: {
		fontSize: 16,
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	spacer: {
		height: 12,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 8,
	},
});

